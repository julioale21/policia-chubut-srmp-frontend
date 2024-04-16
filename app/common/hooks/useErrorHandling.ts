import { AxiosError } from "axios";

function useErrorHandling() {
  const handleError = (errorData: AxiosError) => {
    console.error({ errorData });
  };

  return { handleError };
}

export { useErrorHandling };
