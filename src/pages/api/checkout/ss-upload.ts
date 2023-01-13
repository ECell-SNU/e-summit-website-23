import type { NextApiRequest, NextApiResponse } from "next";

import formidable from "formidable";

// import { Storage, type StorageOptions } from "@google-cloud/storage";

// const gcloudStorageOptions: StorageOptions = {
//   projectId: '',
//   credentials: {}
// }

type Res = {
  status: string;
  message: string;
  random?: any;
};

function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  try {
    // const storage = new Storage();

    console.log("NOTICE: hit ss upload route");
    const form = formidable({ multiples: false });

    form.parse(req, (err, fields, files) => {
      console.log({ files });

      res.status(200).json({
        status: "success",
        message: "Woohoo! It worked :)",
        random: { files },
      });
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "error", message: `oops, this happened: ${e}` });
  }
}

export default handler;
