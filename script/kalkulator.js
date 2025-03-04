// Fungsi untuk mengubah teks menjadi vektor berdasarkan vocabulary
function vectorize(text, vocabulary) {
  const wordCounts = {};
  text.split(" ").forEach((word) => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  return vocabulary.map((word) => wordCounts[word] || 0);
}

// Fungsi untuk menghitung dot product antara dua vektor
function dotProduct(vectorA, vectorB) {
  return vectorA.reduce((sum, a, index) => sum + a * vectorB[index], 0);
}

// Fungsi untuk menghitung magnitude (panjang vektor)
function magnitude(vector) {
  return Math.sqrt(vector.reduce((sum, x) => sum + x * x, 0));
}

// Fungsi untuk menghitung cosine similarity dan mengonversinya ke persentase
function cosineSimilarity(vectorA, vectorB) {
  const dotProd = dotProduct(vectorA, vectorB);
  const magnitudeA = magnitude(vectorA);
  const magnitudeB = magnitude(vectorB);
  if (magnitudeA === 0 || magnitudeB === 0) return 0; // Menghindari pembagian dengan nol
  return (dotProd / (magnitudeA * magnitudeB)) * 100;
}

// Event listener untuk menangani pengiriman form
document
  .getElementById("similarityForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const text1 = document.getElementById("text1").value.trim();
    const text2 = document.getElementById("text2").value.trim();

    if (!text1 || !text2) {
      alert("Mohon masukkan kedua teks!");
      return;
    }

    // Membuat vocabulary dari gabungan kata-kata unik dari kedua teks
    const vocabulary = Array.from(
      new Set([...text1.split(" "), ...text2.split(" ")])
    );

    // Membuat vektor berdasarkan vocabulary
    const vector1 = vectorize(text1, vocabulary);
    const vector2 = vectorize(text2, vocabulary);

    // Menghitung cosine similarity
    const similarityPercentage = cosineSimilarity(vector1, vector2).toFixed(2);

    // Menampilkan hasil
    document.getElementById(
      "result"
    ).innerText = `Kemiripan Cosine: ${similarityPercentage}%`;
  });
