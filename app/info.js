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

//2. Static Site Generating (SSG). Next.js використовує це по дефолту.

async function Page({ params }) {
  const res = await fetch(
    `http://jsonplacehilder.typicode.com/posts/${params.id}`
  );
  //next.js за замовчуванням кешує дані

  const data = res.json();
  return <h1>{data.body}</h1>;
}

//3. Incremental Static Generation (ISR).

async function Page({ params }) {
  const res = await fetch(
    `http://jsonplacehilder.typicode.com/posts/${params.id}`
  );
  //Робить наступну повторну перевірку через час 10.Тобто кешує дані і через проміжок часу -10 оновлює його. Поєднює в собі два методи SSR та SSG.
  {
    next: {
      revalidate: 10;
    }
  }

  const data = res.json();
  return <h1>{data.body}</h1>;
}
