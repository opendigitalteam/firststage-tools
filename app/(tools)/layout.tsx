import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import FooterBranding from "./_components/FooterBranding";
import { LogoLink } from "./_components/LogoLink";
import { Footer, Header, Main, Page } from "./_components/PageWrappers";
import { UtilityLink } from "./_components/UtilityButton";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Page>
      <Header>
        <div className="flex w-full max-w-screen-2xl justify-between gap-3 px-4 pt-4 max-sm:flex-col sm:px-5 md:gap-8 md:px-10 md:pt-5 lg:px-16 2xl:px-20 2xl:pt-10">
          <LogoLink href="https://firststage.co" size="md" />

          <nav className="order-2 flex items-center gap-5 max-md:text-sm">
            <Link href="/" className="underline hover:text-odpink-mid">
              Free Tools
            </Link>

            <Link
              href="https://firststage.co/"
              className="underline hover:text-odpink-mid"
            >
              Features
            </Link>

            <Link
              href="https://firststage.co/pricing"
              className="underline hover:text-odpink-mid"
            >
              Pricing
            </Link>

            <Link
              href="https://firststage.co/sign-in"
              prefetch={false}
              className="underline hover:text-odpink-mid"
            >
              Sign In
            </Link>

            <div className="shrink max-sm:ml-auto">
              <UtilityLink
                href="https://firststage.co/sign-up"
                size="md"
                color="pink-dark"
              >
                Sign up for free
              </UtilityLink>
            </div>
          </nav>
        </div>
      </Header>

      <Main>
        <div className="flex flex-col w-full max-w-screen-2xl justify-between gap-3 px-4 pt-4 max-sm:flex-col sm:px-5 md:gap-8 md:px-10 md:pt-5 lg:px-16 2xl:px-20 2xl:pt-10">
          {children}
        </div>
      </Main>

      <Footer>
        <div className="flex w-full max-w-screen-2xl grow gap-5 px-4 py-10 max-md:flex-wrap sm:px-5 md:gap-10 md:px-10 lg:px-16 2xl:p-20">
          <div className="flex flex-col md:w-5/12">
            <h2 className="font-display text-2xl font-extrabold">
              Have you considered using AI in your hiring?
            </h2>

            <p className="mt-3 text-balance font-light">
              We have developed FirstStage, an AI tool that assesses, ranks and
              progresses candidates automatically. Get started in minutes and
              get your first 50 assessments free every month. No credit card
              needed.
            </p>

            <div className="mt-5">
              <UtilityLink href="https://firststage.co/sign-up">
                Start for free <ChevronRight size={18} className="-mr-1" />
              </UtilityLink>
            </div>
          </div>

          <div className="grow max-md:h-4 max-md:w-full"></div>

          <div className="flex flex-col gap-2 max-md:grow md:w-44">
            <div className="font-display text-lg font-extrabold">Product</div>

            <nav className="flex flex-col gap-2">
              <Link
                href="https://firststage.co/pricing"
                className="underline hover:text-odpink-mid"
              >
                Pricing
              </Link>
              <Link
                href="https://firststage.co/"
                className="underline hover:text-odpink-mid"
              >
                Features
              </Link>
              <Link
                href="https://firststage.co/what-people-are-saying"
                className="underline hover:text-odpink-mid"
              >
                What people say
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2 max-md:grow md:w-44">
            <div className="font-display text-lg font-extrabold">Company</div>

            <nav className="flex flex-col gap-2">
              <Link
                href="https://firststage.co/about"
                className="underline hover:text-odpink-mid"
              >
                About the team
              </Link>

              <Link
                href="https://firststage.co/privacy"
                className="underline hover:text-odpink-mid"
              >
                Privacy
              </Link>

              <Link
                href="https://firststage.co/terms"
                className="underline hover:text-odpink-mid"
              >
                Terms of service
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex w-full grow justify-center px-3 py-10 sm:px-5 md:px-10">
          <FooterBranding />
        </div>
      </Footer>
    </Page>
  );
}
