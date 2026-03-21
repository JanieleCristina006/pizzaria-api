import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";
class ListProductController {
  async handle(req: Request, res: Response) {
    const disabled = req.query.disable as string | undefined;

    const listProduct = new ListProductService();

    const products = await listProduct.execute({
      disable: disabled,
    });

    res.status(200).json(products);
  }
}

export { ListProductController };
