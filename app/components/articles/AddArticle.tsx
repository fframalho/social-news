
import { useState } from "react";
import TextArea from "../shared/TextArea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addNewArticle } from "~/storage/storage";
import { ArticleState } from "~/models/Article";
import Authorized from "../authorization/Authorized";

const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    content: yup.string().required("Content is required"),
    category: yup.string().required("Please select a category"),
    image: yup
      .mixed<FileList>()
      .test("fileExists", "Image is required", (value) => value && value.length > 0)
      .required(),
    state: yup
        .number()
        .oneOf([ArticleState.DRAFT, ArticleState.PUBLISHED], "Please select a state for the article")
        .required()
}).required();

type FormValues = yup.InferType<typeof schema>;

function AddArticle() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
      } = useForm<FormValues>({
        resolver: yupResolver(schema),
      });

      const onSubmit = (data: FormValues) => {
        console.log(data);
    
        addNewArticle({ ...data, image: imagePreview ?? '', id: Date.now() })

        // Clear form
        reset()
        setImagePreview(null)
    };

    const handleImageChange = (fileList: FileList) => {
        const [ file ] = fileList
        
        if (!file) {
            return;
        }

        const reader = new FileReader();
        
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        
        reader.readAsDataURL(file);
    };

    const watchImage = watch("image");

    if (watchImage) {
        handleImageChange(watchImage);
      }

    return (
        <Authorized authorizedRoles={ ['Admin'] }>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl space-y-6">
                <h2 className="text-2xl font-bold text-gray-800" data-testid="add-article-title">Add article</h2>
                    <div className="space-y-4">
                        {/* Text Input */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="article-title">Title</label>
                            <input
                                id="article-title"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your name"
                                {...register("title")}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        {/* Description textarea */}
                        <TextArea
                            id="description-text-area"
                            label="Small description"
                            rows={ 3 }
                            {...register("description")}
                            error={errors.description?.message}
                        />

                        {/* Image Upload */}
                        <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="article-image">Image</label>
                        <input
                            id="article-image"
                            type="file"
                            accept="image/*"
                            className="w-full text-sm text-gray-600"
                            {...register("image")}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-3 h-24 w-24 object-cover border"
                            />
                        )}
                        </div>

                        {/* Category Select */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="article-category">Category</label>
                            <select
                                id="article-category"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("category")}
                            >
                                <option value="">Select category</option>
                                <option value="marketing">Marketing</option>
                                <option value="design">Design</option>
                                <option value="engineering">Engineering</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                        </div>

                        {/* Content textarea */}
                        <TextArea
                            id="content-text-area"
                            label="Content"
                            rows={ 10 }
                            {...register("content")}
                            error={errors.content?.message}
                        />

                        {/* State Select */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="article-state">Save article as:</label>
                            <select
                                id="article-state"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("state")}
                            >
                                <option value={ -1 }>Select state</option>
                                <option value={ ArticleState.DRAFT }>Draft</option>
                                <option value={ ArticleState.PUBLISHED }>Published</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.state?.message}</p>}
                        </div>
                    </div>

                    <button type="submit" className="w-32 py-2 px-4 bg-gray-600 text-gray-200 text-sm rounded-sm hover:bg-gray-700 transition cursor-pointer">
                        Submit
                    </button>
                </div>
            </form>
        </Authorized>
    );
};

export default AddArticle;
