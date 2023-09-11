"use client";
import React, { useEffect, useState } from "react";

import axios, { Axios } from "axios";
import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
interface FileUploadProps extends Partial<DropzoneProps> {
  setImageReview: (image: any) => void;
  imageFileUrl: string;
  setImageFileUrl: (value: string) => void;
  imageFile: any;
  setImageFile: (value: any) => void;
}

function FileUpload({
  imageFile,
  setImageFile,
  imageFileUrl,
  setImageFileUrl,
  setImageReview,
  ...props
}: FileUploadProps) {
  // USEEFFECT TO MAKE A POST REQUEST TO CLOUDINARY STORAGE AND RETURN STRING
  useEffect(() => {
    if (imageFile) {
      const getUploadedImage = async () => {
        try {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append("upload_preset", "ajis_store");
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/isreal/image/upload`,
            formData
          );
          setImageFileUrl(response.data.secure_url);
          setImageReview(response.data.secure_url); // Move this here
        } catch (error) {
          console.error("File upload failed:", error);
        }
      };
      getUploadedImage();
    }
  }, [imageFile, setImageReview]);

  // RETURN INPUT TO EMPTY
  const handleDeleteImage = () => {
    setImageFileUrl(""); // Reset the image URL
    setImageReview(""); // Reset the image review in parent component
    setImageFile(""); // Reset the image review in parent component
  };

  // MANTINE THENME
  const theme = useMantineTheme();
  return (
    <main>
      {imageFileUrl && (
        <div onClick={() => handleDeleteImage()} className="cursor-pointer">
          <RiDeleteBin6Line className="text-red-500 absolute top-0 z-30 right-0 text-[30px] bg-white" />
        </div>
      )}

      <Dropzone
        onDrop={(files) => {
          setImageFile(files[0]);
        }}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(220), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>

          <br />
          {imageFileUrl ? (
            <>
              <Image fill src={imageFileUrl} alt="img" className="z-10" />
            </>
          ) : (
            <>
              <Dropzone.Idle>
                <IconPhoto size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>
            </>
          )}
          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
          </div>
        </Group>
      </Dropzone>
    </main>
  );
}

export default FileUpload;
