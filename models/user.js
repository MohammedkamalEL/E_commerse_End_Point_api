const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const docToJSON = (doc, ret) => {
  // لاحظ هنا أنك تستخدم passwordHash وليس password بناءً على الـ Schema الخاص بك
  delete ret.passwordHash; 
  delete ret.__v;
  return ret;
};

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'enter password please'],
    },
    email: {
      type: String,
      required: true,
    },
    // phone: {
    //   type: String,
    //   required: true,
    // },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true, transform: docToJSON },
    toObject: { virtuals: true, transform: docToJSON },
  },
);


userSchema.pre("save", async function (next) {

  const user = this;

  // 1. التحقق: إذا لم يتم تعديل كلمة المرور، انتقل للخطوة التالية فوراً
  if (!user.isModified("passwordHash")) {
    return;
  }

  try {
  
    // 3. تشفير كلمة المرور وحفظها في الحقل
    user.passwordHash = await bcrypt.hash(user.passwordHash, 10);

    
  } catch (error) {
    throw error
  }

});

exports.User = mongoose.model("User", userSchema);
