import axios from "axios";

export const generateCoverImage = async (title, content) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.error("❌ OpenAI API 키가 설정되지 않았습니다.");
    return null;
  }

  const prompt = `
Design a book cover illustration for the novel titled "${title}". 
The story is about: ${content}.
The cover must include the exact book title "${title}" clearly written in the image without any spelling mistakes.
Use an emotional, artistic, and atmospheric style suitable for a novel cover.
Do not add any additional text except the title.
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: prompt,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 🔍 디버깅용 로그
    console.log("✅ OpenAI 응답 전체:", response.data);

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      console.error("❗ 이미지 URL이 응답에 없음.");
      return null;
    }

    const imageUrl = response.data.data[0].url;
    console.log("✅ 생성된 이미지 URL:", imageUrl);
    return imageUrl;

  } catch (error) {
    console.error("🔥 OpenAI 이미지 생성 실패:", error.response?.data || error.message);
    return null;
  }
};
