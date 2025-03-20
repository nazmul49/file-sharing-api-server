export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        error: "No file uploaded",
      });
    }

    const { file} = req;
    const response = fileService.uploadFile(file);
    res.json(response);
    res.send({
      success: "File uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to upload the file",
    });
  }
}

export const downloadFile = async (req, res) => {
  try {
    res.send({
      success: "File downloaded successfully",
    });
  } catch (error) {
    res.status(500).send({
      error: "Failed to download the file",
    });
  }
}

export const deleteFile = async (req, res) => {
  try {
    res.send({
      success: "File deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      error: "Failed to delete the file",
    });
  }
}
