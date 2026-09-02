import { useRef, useState, type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";

interface SMSVerificationData {
  code: string;
}

interface SMSVerificationFormProps {
  onSubmit: (data: SMSVerificationData) => Promise<void>;
  onResendCode?: () => void;
  serverError?: string | null;
}

const SMSVerificationForm = ({
  onSubmit,
  onResendCode,
  serverError,
}: SMSVerificationFormProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SMSVerificationData>();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = useState(["", "", "", "", ""]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Move to next input if digit entered
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onFormSubmit = () => {
    const code = digits.join("");
    if (code.length === 5) {
      return onSubmit({ code });
    }
  };

  const allFilled = digits.every((digit) => digit !== "");

  return (
    <div className="w-full max-w-md bg-neutral-light px-8 py-12 rounded-3xl shadow-lg font-family-poppins">
      {/* Key Icon */}
      <div className="flex justify-center mb-6">
        <div className="text-5xl">🔑</div>
      </div>

      <h1 className="text-2xl font-bold text-neutral-darker text-center mb-2">
        Enter SMS
      </h1>
      <p className="text-center text-neutral-dark mb-8 text-sm">
        Enter the 5-digit code sent to you
      </p>

      {serverError && (
        <p
          role="alert"
          className="mb-4 text-sm text-red-600 text-center bg-red-50 rounded-xl px-4 py-2"
        >
          {serverError}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-8"
      >
        {/* OTP Input Fields */}
        <div className="flex justify-between gap-3">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 border-2 border-neutral-light-active rounded-full text-center text-2xl font-bold text-neutral-darker focus:outline-none focus:border-primary transition-colors bg-white"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !allFilled}
          className="w-full py-3 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-lg rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Verifying..." : "Continue"}
        </button>
      </form>

      {/* Resend Code Link */}
      <div className="text-center mt-8">
        <span className="text-neutral-darker text-sm">
          Didn't receive a code?{" "}
        </span>
        <button
          type="button"
          onClick={onResendCode}
          className="text-primary font-semibold hover:text-primary-hover transition-colors text-sm"
        >
          Resend code
        </button>
      </div>
    </div>
  );
};

export default SMSVerificationForm;
