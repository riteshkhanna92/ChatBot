export const SET_SENTIMENT_INFO = 'SET_SENTIMENT_INFO';

export function setSentiment(api_data) {
  return {
    "type": SET_SENTIMENT_INFO,
    "api_data": api_data
  };
}

