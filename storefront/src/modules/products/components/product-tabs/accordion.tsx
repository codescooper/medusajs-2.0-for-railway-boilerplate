import { Text, clx } from "@medusajs/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import React from "react"

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: true
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  children: React.ReactNode
}

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
      React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
      React.RefAttributes<HTMLDivElement>)

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root
      {...props}
      className="flex flex-col gap-4"
    >
      {children}
    </AccordionPrimitive.Root>
  )
}

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  headingSize = "large",
  customTrigger = undefined,
  forceMountContent = undefined,
  ...props
}) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={clx(
        "group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300",
        "hover:border-white/20 hover:bg-white/[0.06]",
        className
      )}
    >
      <AccordionPrimitive.Header className="px-4 md:px-5">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between gap-4 py-4">
            <div className="flex min-w-0 flex-1 flex-col">
              <Text
                className={clx(
                  "tracking-[-0.02em] text-white",
                  headingSize === "small" && "text-sm font-medium",
                  headingSize === "medium" && "text-base font-medium",
                  headingSize === "large" && "text-lg font-semibold"
                )}
              >
                {title}
              </Text>

              {subtitle && (
                <Text
                  as="span"
                  size="small"
                  className="mt-1 text-white/55"
                >
                  {subtitle}
                </Text>
              )}
            </div>

            <AccordionPrimitive.Trigger className="shrink-0">
              {customTrigger || <MorphingTrigger />}
            </AccordionPrimitive.Trigger>
          </div>
        </div>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className={clx(
          "overflow-hidden radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open"
        )}
      >
        <div className="border-t border-white/10 px-4 pb-5 pt-4 md:px-5">
          {description && (
            <Text className="mb-4 text-sm leading-6 text-white/65">
              {description}
            </Text>
          )}

          <div className="w-full text-white/75">
            {children}
          </div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

Accordion.Item = Item

const MorphingTrigger = () => {
  return (
    <div
      className="
        relative flex h-10 w-10 items-center justify-center
        rounded-full border border-white/10 bg-white/[0.06]
        backdrop-blur-xl transition-all duration-300
        hover:border-cyan-300/30 hover:bg-white/[0.10]
      "
    >
      <span
        className="
          absolute h-[1.5px] w-4 rounded-full bg-white/80
          transition-all duration-300
        "
      />
      <span
        className="
          absolute h-4 w-[1.5px] rounded-full bg-white/80
          transition-all duration-300
          group-data-[state=open]:rotate-90
          group-data-[state=open]:scale-y-0
        "
      />
    </div>
  )
}

export default Accordion
