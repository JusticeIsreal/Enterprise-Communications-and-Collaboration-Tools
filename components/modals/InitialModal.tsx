"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import React, { useState } from "react";
import { DialogFooter } from "../ui/dialog";
import { FieldValues, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import FileUpload from "../FileUpload";
import axios from "axios";
import { useRouter } from "next/navigation";

// FORM SCHEMA -

function InitialModal() {
  const router = useRouter();
  // GET IMAGE URL DATA STATE TO RENDER FILE INPUT
  const [imageFile, setImageFile] = useState<any>();
  const [imageFileUrl, setImageFileUrl] = useState<string>("");

  const [opened, { open, close }] = useDisclosure(true);
  const [imageReview, setImageReview] = useState<any>("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const values = {
      name: data.name,
      imageUrl: imageFileUrl,
    };
    try {
      const ee = await axios.post("/api/servers", values);
      console.log(ee);
      reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create server" centered>
        <div className="text-2xl text-center font-bold">
          Customize your server
        </div>
        {/* <Form {...form}> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="space-y-8 px-6">
            <div className="flex items-center justify-center text-center relative ">
              <FileUpload
                setImageFileUrl={setImageFileUrl}
                imageFileUrl={imageFileUrl}
                setImageFile={setImageFile}
                imageFile={imageFile}
                setImageReview={setImageReview}
              />
            </div>

            <div className="flex justify-between flex-col">
              <label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                Server name
              </label>
              <input
                type="text"
                placeholder="Enter server name"
                className="bg-zinc-300/50 p-4 mt-3 border-0 w-[100%] h-[44px] focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span
                  className="errror-msg"
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "red",
                  }}
                >
                  Kindly enter this location
                </span>
              )}
            </div>
          </div>
          {imageFileUrl && (
            <DialogFooter className="bg-[#5BBDCE] px-6 py-4  w-[100px] ml-[auto] rounded-md">
              <input type="submit" value="Create" />
            </DialogFooter>
          )}{" "}
        </form>
        {/* </Form> */}
      </Modal>
      <Group position="center">
        <Button onClick={open}>Create server</Button>
      </Group>
    </>
  );
}

export default InitialModal;
