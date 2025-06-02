import axios from 'axios';
export const generateCoverImage = async (apiKey, title, content) => {
  if (!apiKey) {
    console.error("❌ OpenAI API 키가 제공되지 않았습니다.");
    return null;
  }

  const prompt = `
  Create a high-quality 3D-rendered image of a single hardcover book standing upright.

  The book is titled "${title}".
  Its story is about: ${content}

  Design the front cover to visually reflect the core feeling or theme of the story. Use symbolic or abstract imagery that conveys the mood — such as hope, loneliness, growth, mystery, or wonder — based on the story.

  The cover should use artistic and metaphorical visuals that hint at the genre and tone without using any text or characters.

  Keep the background simple and softly lit. Focus on making the book appear visually striking and emotionally resonant.
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-3",    
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard"
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data?.data?.[0]?.url) {
      console.error("❗ 이미지 URL이 응답에 없음.");
      return null;
    }

    return response.data.data[0].url;

  } catch (error) {
    console.error("🔥 OpenAI 이미지 생성 실패:", error.response?.data || error.message);
    return null;
  }
};
