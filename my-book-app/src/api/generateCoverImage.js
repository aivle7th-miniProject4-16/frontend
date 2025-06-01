import axios from 'axios';

export const generateCoverImage = async (title, content) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    console.error("❌ OpenAI API 키가 설정되지 않았습니다.");
    return null;
  }

//   const prompt = `
// Create a high-resolution, close-up 3D rendering of a modern printed book standing upright.
// The book should appear large in the frame, clearly displaying its front cover with minimal background.

// Book title: "${title}"
// Story summary: ${content}

// Design the front cover to reflect the story’s theme using modern graphic design — bold typography, emotional or atmospheric colors, and minimalistic but impactful layout.
// Make the book look professionally published with sharp edges, realistic lighting, and subtle shadows.

// Only the title "${title}" should appear on the cover — no other text.
// The focus should be on showcasing the cover design in detail. Avoid distant or small book perspectives.
// `;
const prompt = `
Create a high-resolution, close-up 3D rendering of a modern printed book standing upright.
The book should appear large in the frame, with its front cover clearly visible in full detail and minimal background.

This book is titled "${title}", and the story is about: ${content}

Design the cover in a vibrant, richly artistic style — use bold and expressive colors, layered textures, glowing or luminous effects, and intricate visual elements.
Incorporate symbolic or metaphorical imagery that represents the story’s core emotions or themes.
Avoid literal illustrations; instead, aim for imaginative, surreal, or dreamlike compositions that evoke curiosity and beauty.

The book should look like a luxurious, professionally published print — glossy or matte finish, crisp lighting, and dramatic shadows.
Do not include any text. Focus entirely on the visual artistry and emotional resonance of the cover design.
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
