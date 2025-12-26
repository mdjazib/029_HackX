import authentication from "@/lib/authentication";
import token from "@/schema/token";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import account from "@/schema/account";
import rand from "random-key";
import login from "@/schema/login";

export async function POST(req) {
    try {
        await authentication();
        const cookie = await cookies();
        const formdata = await req.formData();
        const email = formdata.get("email");
        const fingerprint = formdata.get("device");
        const tokens = await token.countDocuments({ email, "device.fingerprint": fingerprint });
        if (tokens < 4) {
            const raw_token = v4();
            const width = formdata.get("width");
            const device = { fingerprint, width };
            const hashed_token = bcrypt.hashSync(raw_token, 10);
            const ref_token = (await token.create({ email, token: hashed_token, device, expires: new Date(Date.now() + 1000 * 60 * 60) }))._id;
            const signed_token = jwt.sign({ ref_token }, process.env.JWT_KEY, { expiresIn: '60m' });
            cookie.set("__tmp_ref", signed_token, { httpOnly: true, sameSite: "strict", maxAge: 60 * 60 });
            const client_token = `${req.headers.get("origin")}/auth?token=${raw_token}`;
            const transporter = nodemailer.createTransport({
                host: "smtp.hostinger.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            });
            await transporter.sendMail({
                from: '"Nice Panda" <nicepanda.no-reply@vebedge.com>',
                to: email,
                subject: `Sign in to Your Account - ${new Date().toLocaleString()}`,
                html: `
<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;background:#ffffff;">
  <body style="margin:0;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;background:#ffffff;color:#000000;">
    <h2 style="margin:0 0 20px 0;font-weight:600;font-size:22px;">
      Nice Panda
    </h2>

    <p style="font-size:15px;line-height:1.6;margin-bottom:25px;">
      Your thoughts belong here.<br>
      Click the button below to securely sign in to your account.
    </p>

    <a href="${client_token}"
       style="display:inline-block;padding:14px 28px;background:#000000;color:#ffffff;
       text-decoration:none;font-size:15px;font-weight:600;border-radius:0;">
       Sign In
    </a>

    <p style="font-size:13px;color:#444;margin-top:30px;line-height:1.6;">
      This link will expire soon for your security.<br>
      If you didn’t request this, you can safely ignore this email.
    </p>

    <p style="font-size:12px;color:#888;margin-top:40px;">
      Developed by <strong>Veb Edge</strong> — vebedge.com
    </p>
  </body>
</html>

                `
            })
            return NextResponse.json({}, { status: 200 });
        } else {
            return NextResponse.json({}, { status: 429 });
        }
    } catch (error) {
        return NextResponse.json({}, { status: error.code });
    }
}

export async function GET(req) {
    try {
        const cookie = await cookies();
        const url = new URL(req.url);
        const client_token = url.searchParams.get("token");
        const fingerprint = url.searchParams.get("fingerprint");
        if (!client_token || !fingerprint) { return NextResponse.json({}, { status: 400 }); }
        const ref_cookie = cookie.get("__tmp_ref")?.value;
        if (!ref_cookie) return NextResponse.json({}, { status: 401 });
        const { ref_token } = jwt.verify(ref_cookie, process.env.JWT_KEY);
        const record = await token.findById(ref_token);
        if (!record) return NextResponse.json({}, { status: 401 });
        const verified = bcrypt.compareSync(client_token, record.token);
        const device_match = fingerprint === record.device.fingerprint;
        if (!verified || !device_match) { return NextResponse.json({}, { status: 401 }); }
        const email = record.email;
        let user = await account.findOne({ email });
        if (!user) { user = await account.create({ email, pid: rand.generateDigits(18), username: email.split("@")[0] }); }
        const aid = user._id;
        let session = await login.findOne({ aid, "device.fingerprint": fingerprint });
        if (!session) { session = await login.create({ aid, device: { fingerprint, width: record.device.width, }, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60), }); }
        const lid = session._id;
        const signed_lid = jwt.sign({ lid }, process.env.JWT_KEY, { expiresIn: "60d" });
        cookie.set("__tid_fpi", signed_lid, { httpOnly: true, sameSite: "strict", maxAge: 60 * 60 * 24 * 60 });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error("AUTH ERROR:", error);
        return NextResponse.json({}, { status: 500 });
    }
}
