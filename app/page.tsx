import { redirect } from "next/navigation";

/** 루트는 대시보드 셸이 있는 요약으로 보냅니다. */
export default function Home() {
  redirect("/dashboard");
}
