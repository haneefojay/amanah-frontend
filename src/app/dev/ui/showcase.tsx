"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoneyAmount } from "@/components/ui/money-amount";
import { NairaInput, useNairaInput } from "@/components/ui/naira-input";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { CampaignStatusBadge, ItemStatusBadge, VerifiedBadge } from "@/components/ui/status-badges";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { CampaignStatus } from "@/lib/api/schemas";

const statuses: CampaignStatus[] = [
  "DRAFT",
  "PENDING_REVIEW",
  "REJECTED",
  "LIVE",
  "FUNDED",
  "CLOSED",
  "COMPLETED",
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-border bg-sand-50 p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

export function UiShowcase() {
  const amount = useNairaInput(20_000_000);
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-10">
      <h1 className="text-3xl font-extrabold tracking-[-0.02em]">UI components</h1>
      <p className="text-ink-600">Development only. Built on shadcn/ui (ADR-009).</p>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="gold">Gold</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button loading>Saving</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Form fields">
        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input id="name" placeholder="Aisha Bello" />
          <FieldDescription>As it should appear on your receipt.</FieldDescription>
        </Field>
        <Field data-invalid={amount.error ? true : undefined}>
          <FieldLabel htmlFor="amount">Amount (up to ₦200,000)</FieldLabel>
          <NairaInput
            id="amount"
            value={amount.text}
            onValueChange={amount.setText}
            aria-invalid={amount.error ? true : undefined}
          />
          {amount.error && <FieldError>{amount.error}</FieldError>}
          {amount.kobo !== null && !amount.error && (
            <FieldDescription>
              You will give <MoneyAmount kobo={amount.kobo} />
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="update">Update</FieldLabel>
          <Textarea id="update" placeholder="What happened today?" />
        </Field>
        <Field>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Select>
            <SelectTrigger id="city" className="w-full">
              <SelectValue placeholder="Choose a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="offa">Offa</SelectItem>
              <SelectItem value="ilorin">Ilorin</SelectItem>
              <SelectItem value="lagos">Lagos</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <div className="flex items-center gap-3">
          <Checkbox id="agree" />
          <Label htmlFor="agree">I confirm these details are correct</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch id="anon" />
          <Label htmlFor="anon">Give anonymously</Label>
        </div>
      </Section>

      <Section title="Status">
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <CampaignStatusBadge key={s} status={s} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <ItemStatusBadge status="NEEDED" />
          <ItemStatusBadge status="PURCHASED" />
          <ItemStatusBadge status="DELIVERED" />
          <ItemStatusBadge status="DISPUTED" />
        </div>
        <VerifiedBadge />
        <ProgressBar value={30_000_000} max={50_000_000} label="Raised so far" />
      </Section>

      <Section title="Overlays and feedback">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Close this campaign?</DialogTitle>
              <DialogDescription>
                Funds raised are still used for the stated purpose.
              </DialogDescription>
              <DialogFooter>
                <Button variant="destructive">Close campaign</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open bottom sheet</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader>
                <SheetTitle>Give to this campaign</SheetTitle>
                <SheetDescription>Choose an amount up to what is still needed.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Button variant="outline" onClick={() => toast.success("Expense logged")}>
            Show toast
          </Button>
        </div>
        <Tabs defaultValue="items">
          <TabsList>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <TabsContent value="items">Item list</TabsContent>
          <TabsContent value="expenses">Expense list</TabsContent>
        </Tabs>
        <Card>
          <CardHeader>
            <CardTitle>Balance held</CardTitle>
            <CardDescription>Raised minus spent</CardDescription>
          </CardHeader>
          <CardContent>
            <MoneyAmount kobo={8_000_000} className="text-2xl font-bold" />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-2" aria-hidden="true">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <EmptyState title="No campaigns yet" description="Create your first campaign." />
        <ErrorState onRetry={() => toast("Retrying…")} />
      </Section>
    </main>
  );
}
