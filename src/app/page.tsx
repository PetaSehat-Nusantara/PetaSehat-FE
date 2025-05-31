// import { useAuthUser } from "@/hooks/use-auth-user";
import HomePageModule from '@/modules/HomepageModule';
import { cookies } from 'next/headers';

export default async function Home() {
  // const user = useAuthUser();
  // console.log(user);
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value
  console.log(token);

  return <HomePageModule />;
}
