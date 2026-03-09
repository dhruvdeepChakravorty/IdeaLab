import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
  {
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    versionNum: {
      type: Number,
      required: true,
    },
    aiOutput: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
  },
  { timestamps: true },
);

versionSchema.index({ ideaId: 1, createdAt: -1 });
const Version = mongoose.model("Version", versionSchema);

export default Version;
