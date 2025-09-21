import { parseCookies } from "nookies";

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const token = cookies.memberToken; // cookie set in backend

  if (token) {
    return {
      redirect: {
        destination: "/member-home",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}

export default function Start() {
  return null;
}
