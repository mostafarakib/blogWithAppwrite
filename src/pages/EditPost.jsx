import React, { useEffect, useState } from "react";
import { Contaianer, PostForm } from "../components/index";
import appwriteService from "../appwrite/servicesConfig";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Contaianer>
        <PostForm post={post} />
      </Contaianer>
    </div>
  ) : null;
}

export default EditPost;
