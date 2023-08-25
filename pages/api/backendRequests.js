import axios from "axios";

const addNft = async (documentInfo) => {
  console.log(documentInfo);

  try {
    const token = window?.localStorage?.getItem('Token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
       },
      withCredentials: false,
    };

    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/nfts/`, {
      nft_id: documentInfo.nft_id,
      user_id: documentInfo.user_id,
      meta_data: "",
      contract_id: "",
      name: documentInfo.name,
      format: documentInfo.format,
      image: "",
      status: documentInfo.status,
      category: documentInfo.category,
      created_at: documentInfo.created_at
    },
      config
    ).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error("Axios error:", error.response ? error.response.data : error.message);
    });
  } catch (e) {
    console.error(e);
  }

};

export { addNft };
