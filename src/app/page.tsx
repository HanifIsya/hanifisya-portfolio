import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { AllProjects } from "@/components/all-projects";
import { Stack } from "@/components/stack";
import { GitHubTelemetry } from "@/components/github-telemetry";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <AllProjects />
        <Stack />
        <GitHubTelemetry />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
