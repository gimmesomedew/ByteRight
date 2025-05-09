import { useState } from "react";
import { Button } from "../ui/Button";

export function Feature108({ badge, heading, description, tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const activeContent = tabs.find((tab) => tab.value === activeTab)?.content;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
              {badge}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-secondary">
              {heading}
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] grid gap-12 px-4 sm:px-6 md:grid-cols-[1fr_400px] md:gap-16 lg:grid-cols-[1fr_600px] lg:gap-20 md:px-10">
          <div className="flex flex-col justify-center space-y-4">
            <div className="grid gap-2">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.value}
                    variant={activeTab === tab.value ? "primary" : "ghost"}
                    className={`flex items-center gap-2 ${activeTab === tab.value ? 'text-white' : 'text-secondary hover:text-primary'}`}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.icon}
                    {tab.label}
                  </Button>
                ))}
              </div>
              {activeContent && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm font-medium w-fit">
                      {activeContent.badge}
                    </div>
                    <h3 className="text-2xl font-bold text-secondary">{activeContent.title}</h3>
                    <p className="text-gray-600">
                      {activeContent.description}
                    </p>
                  </div>
                  <Button className="w-fit">{activeContent.buttonText}</Button>
                </div>
              )}
            </div>
          </div>
          {activeContent && (
            <div className="flex items-center justify-center">
              <img
                alt={activeContent.imageAlt}
                className="aspect-video overflow-hidden rounded-xl object-cover shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in"
                src={activeContent.imageSrc}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
