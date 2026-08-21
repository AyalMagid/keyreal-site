import NotFoundView from "../components/NotFoundView";

export const metadata = {
  title: "העמוד לא נמצא | קיריל",
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return <NotFoundView />;
}
