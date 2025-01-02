import { Router, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

// https://supabase.com/docs/reference/javascript/select
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export const apiRouter: Router = Router();

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

apiRouter.get("/products", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("Product").select("*");
    if (error) {
      throw error;
    }
    res.json(data);
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
      throw error;
    }

    res.json(data);
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
      throw error;
    }

    res.json(data);
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error) });
  }
});
