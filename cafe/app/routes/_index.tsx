import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Coffee Beans" },
    { name: "description", content: "Discover various coffee beans!" },
  ];
};

export default function Index() {
  return (
    <>
      <h1>Coffee Beans Form</h1>
      {/* actionで送信先のパスを指定 */}
      <form action="/coffeebean_detail" method="post">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter coffee bean title"
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}