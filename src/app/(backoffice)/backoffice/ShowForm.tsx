"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { insertShowSchema, type insertShowSchemaType, type selectShowSchemaType } from "@/zod-schemas/show"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

import { saveShowAction } from "@/app/actions/saveShowAction"
import { useAction } from 'next-safe-action/hooks'
import { useToast } from "@/hooks/use-toast"
import { LoaderCircle } from 'lucide-react'
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"
import { InputWithLabel } from "@/components/inputs/InputWithLabel"

type Props = {
    show?: selectShowSchemaType,
}

export default function ShowForm({ show }: Props) {
    // const { getPermission, getPermissions, isLoading } = useKindeBrowserClient()
    // const isManager = !isLoading && getPermission('manager')?.isGranted

    // const permObj = getPermissions()
    // const isAuthorized = !isLoading && permObj.permissions.some(perm => perm === 'manager' || perm === 'admin')

    const  { toast } = useToast();

    const defaultValues: insertShowSchemaType = {
        id: show?.id ?? 0,
        name: show?.name ?? '',
        place: show?.place ?? '',
        city: show?.city ?? '',
        address: show?.address ?? '',
        imageUrl: show?.imageUrl ?? ''
    }

    const form = useForm<insertShowSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertShowSchema),
        defaultValues,
    })

    const { 
        execute: executeSave,
        result: saveResult,
        isPending: isSaving,
        reset: resetSaveAction
    } = useAction(saveShowAction, {
        onSuccess({ data }) {
            if (data?.message) {
                toast({
                    variant: "default",
                    title: "Success!",
                    description: data?.message,
                })
            }
        },
        onError({ error }) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: "Save Failled",
            })
        }
    })

    async function submitForm(data: insertShowSchemaType) {
        executeSave(data)
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {show?.id ? "Edit" : "New"} Show {show?.id ? `#${show.id}`: "Form"}
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                >
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertShowSchemaType>
                            fieldTitle="Name"
                            nameInSchema="name"
                        />
                        <InputWithLabel<insertShowSchemaType>
                            fieldTitle="Nom de l'endroit"
                            nameInSchema="place"
                        />
                        <InputWithLabel<insertShowSchemaType>
                            fieldTitle="Adress"
                            nameInSchema="address"
                        />
                        <InputWithLabel<insertShowSchemaType>
                            fieldTitle="City"
                            nameInSchema="city"
                        />
                    </div>

                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="w-3/4"
                                variant="default"
                                title="Save"
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <>
                                        <LoaderCircle className="animate-spin" /> Saving
                                    </>
                                ) : "Save" }
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                title="Reset"
                                onClick={() => { 
                                    form.reset(defaultValues)
                                    resetSaveAction()
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>

                </form>
            </Form>

        </div>
    )
}