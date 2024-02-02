import AuthGuard from "./components/AuthGuard";

export default function App() {
  return (
    <AuthGuard>
      <div style={{ width: "100%" }}>
        <h3 style={{ textAlign: "center" }}>Loading ...</h3>
      </div>
    </AuthGuard>
  );
}
