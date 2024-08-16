import { useState } from "react";

const useSubmitForm = (handleSubmitFunction) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await handleSubmitFunction();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSubmit };
};

export default useSubmitForm;
