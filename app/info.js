// Є три методи отримання даних/////

//1. Server Side Rendering (SSR)

async function Page({ params }) {
  const res = await fetch(
    `http://jsonplacehilder.typicode.com/posts/${params.id}`
  );
  {
    cache: "no-store";
  }

  const data = res.json();
  return <h1>{data.body}</h1>;
}

//2. Static Site Generating (SSG)

async function Page({ params }) {
  const res = await fetch(
    `http://jsonplacehilder.typicode.com/posts/${params.id}`
  );
  //next.js за замовчуванням кешує дані

  const data = res.json();
  return <h1>{data.body}</h1>;
}
