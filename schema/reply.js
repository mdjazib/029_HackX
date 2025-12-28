import mongoose, { Schema } from "mongoose";

const replySchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "account", required: true },
    thoughtId: { type: mongoose.Schema.Types.ObjectId, ref: "thought", required: true },
    content: { type: String, required: true, minlength: 1, maxlength: 1000 },
  },
  { timestamps: true }
);

replySchema.index({ thoughtId: 1, createdAt: -1 });

export default mongoose.models.reply || mongoose.model("reply", replySchema);
