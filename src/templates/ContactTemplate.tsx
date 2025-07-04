import PageLayout from "@/layouts/PageLayout";
import SectionTemplate from "./SectionTemplate";
import TitleAndSubtitleSection from "@/app/components/molecules/TitleAndSubtitleSection";
import Form from "@/app/components/organisms/Form";

export default function ContactTemplate() {
  return (
    <PageLayout>
      <SectionTemplate>
        <TitleAndSubtitleSection
          title="Contact"
          subtitle={
            <>
              <span>
                Have a <span className="font-bold">project in mind</span>, a{" "}
                <span className="font-bold">question</span>, or just want to{" "}
                <span className="font-bold">say hello</span>?<br />
                Feel free to reach out, I{`'`}m always open to connect!
              </span>
            </>
          }
          className="my-16 sm:mt-28 sm:mb-12"
        >
          <div className="w-full flex justify-center">
            <Form />
          </div>
        </TitleAndSubtitleSection>
      </SectionTemplate>
    </PageLayout>
  );
}
