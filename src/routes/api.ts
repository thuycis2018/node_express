import { Router, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import { getErrorMessage } from "../util/util";

// https://supabase.com/docs/reference/javascript/select
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export const apiRouter: Router = Router();

apiRouter.get("/products", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("Product").select("*");
    if (error) {
      res.status(400).json({ error: error.details });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});

apiRouter.get("/products/featured", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("Product")
      .select("*")
      .eq("featured", true);

    if (error) {
      res.status(400).json({ error: error.details });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});

apiRouter.get("/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("Product")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      res.status(400).json({ error: error.details });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error) });
  }
});

apiRouter.post("/products", async (req: Request, res: Response) => {
  const {
    id,
    name,
    company,
    description,
    featured,
    image,
    price,
    slug,
    createdAt,
    updatedAt,
    clerkId,
  } = req.body;

  try {
    const { data, error } = await supabase.from("Product").insert([
      {
        id,
        name,
        company,
        description,
        featured,
        image,
        price,
        slug,
        createdAt,
        updatedAt,
        clerkId,
      },
    ]);
    if (error) {
      res.status(400).json({ error: error.details });
    } else {
      res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});

apiRouter.put("/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, company, description, featured, image, price, slug } = req.body;

  try {
    const { data, error } = await supabase
      .from("Product")
      .update([
        {
          name,
          company,
          description,
          featured,
          image,
          price,
          slug,
        },
      ])
      .eq("id", id);
    if (error) {
      res.status(400).json({ error: error.details });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});

apiRouter.delete(
  "/products/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const { data, error } = await supabase
        .from("Product")
        .delete()
        .eq("id", id);

      if (error) {
        res.status(400).json({ error: error.details });
      } else {
        res.json({
          message: `Product with ID ${id} deleted successfully`,
          data,
        });
      }
    } catch (error) {
      res.status(500).json({ error: getErrorMessage(error) });
    }
  }
);
