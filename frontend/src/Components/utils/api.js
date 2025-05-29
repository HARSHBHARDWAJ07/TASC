import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;

export const fetchQuestions = async (category, difficulty) => {
 try{
  const response = await axios.get(`${API_URL}/api/questions`, {
    params: { category, difficulty },
  });
  return response.data;
 } 
  catch (error) {
    console.error("Error fetching questions:", error.response?.data || error.message);
    throw error;
 }
};

export const evaluateAnswer = async (question,
  financialSituation,
  answer,) => {
  try {
    console.log("Sending payload:", {
      question,
      financial_situation: financialSituation,
      answer,
    });
    const response = await axios.post(`${API_URL}/api/evaluate`, {
      question: question?.trim(), // Ensure all inputs are sanitized
      financial_situation: financialSituation?.trim(),
      answer: answer?.trim(),
    });
  return response.data;
}
  
catch (error) {
  console.error("Error evaluating answer:", error);
  throw error; // Propagate error to handle in the calling component
}
}
