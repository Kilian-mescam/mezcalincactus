"use client"

import { useFormContext } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputHTMLAttributes } from "react"

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    className?: string,
} & InputHTMLAttributes<HTMLInputElement>

export function CustomInputWithLabel<S>({
    fieldTitle, nameInSchema, className, ...props
} : Props<S>) {
    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            id={nameInSchema}
                            className={`w-full disabled:text-blue-500 dark:disabled:text-green-500 focus-visible:outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed text-primary disabled:opacity-75 rounded-none border-b border-primary ${className}`}
                            placeholder={fieldTitle}
                            {...props}
                            {...field}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}