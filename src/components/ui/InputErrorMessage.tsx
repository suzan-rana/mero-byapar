import { FieldError } from "react-hook-form";

export interface InputErrorMessageProps {
  error?: FieldError;
}
const InputErrorMessage = ({ error }: InputErrorMessageProps) => {
  return (
    <>
      {error && (
        <p className="text-sm font-medium text-red-500 md:text-base">
          {error.message}
        </p>
      )}
    </>
  );
};
export default InputErrorMessage
