
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <Link to="/dashboard">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-12">
          {/* About CloudSync Section */}
          <section className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              About CloudSync
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              CloudSync is a secure, unified multicloud file storage system helping users manage files across Google Drive, OneDrive, and more.
            </p>
          </section>

          <Separator />

          {/* Mission Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              Our mission is to simplify the digital workspace by unifying multiple cloud storage services into a single, intuitive platform. We believe in giving users complete control over their digital assets regardless of where they're stored.
            </p>
          </section>

          <Separator />

          {/* Vision Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Vision</h2>
            <p className="text-muted-foreground">
              We envision a world where managing files across different cloud providers is seamless and effortless. CloudSync aims to be the bridge connecting disparate storage services, enabling users to focus on productivity rather than file management.
            </p>
          </section>

          <Separator />

          {/* Team Section */}
          <section className="space-y-6">
            <h1 className="text-2xl font-semibold">Our Team members</h1>
            <h3 className="text-2xl font-semibold">Ayushi Gautam</h3>
            <h3 className="text-2xl font-semibold">Raghav Turkar</h3>
            <h3 className="text-2xl font-semibold">Mokshita Atluri</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-2">
                
              </div>
              
              
              
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-background mt-16">
        <div className="container mx-auto p-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CloudSync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
