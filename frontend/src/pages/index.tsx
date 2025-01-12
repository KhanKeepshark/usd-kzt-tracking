import { Main } from "@/widgets/main";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}
