import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export default async function Home() {
  const res = await axios.get(baseUrl);
  const data = res.data
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <h1>{data}</h1>
    </div>
  );
}
