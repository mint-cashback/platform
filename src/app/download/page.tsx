import { redirect } from "next/navigation";

const DOWNLOAD_URL = "https://chromewebstore.google.com/detail/mint-cashback/ofjcmaogknnekkjlhngkopodgjefkpei";

export default function DownloadPage() {
  return redirect(DOWNLOAD_URL);
}
