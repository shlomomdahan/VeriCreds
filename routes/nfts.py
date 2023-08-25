from flask import Blueprint, request, jsonify
from flask_cors import CORS
from bson import json_util
import json

from auth_middleware import token_required
from models import NFT

nfts = Blueprint('nfts', __name__, template_folder='routes')
CORS(nfts)


@nfts.route('/', methods=['POST'])
@token_required
def add_nft():
    try:
        nft = request.get_json()

        if not nft:
            return jsonify({
                "message": "Please provide NFT details",
                "data": None,
                "error": "Bad request"
            }), 400

        nft = NFT.add_nft(**nft)
        if not nft:
            return jsonify({
                "message": "NFT could not be added",
                "error": "Conflict",
                "data": None
            }), 409

        return jsonify({
            "message": "Successfully added new NFT",
            "data": json.loads(json_util.dumps(nft))
        }), 201

    except Exception as e:
        return jsonify({
            "message": "Something went wrong",
            "error": str(e),
            "data": None
        }), 500


@nfts.route('/', methods=['GET'])
@token_required
def get_all_nfts():
    try:
        all_nfts = NFT.get_all_nfts()
        return jsonify({
            "message": "Successfully retrieved all NFTs",
            "data": all_nfts
        })

    except Exception as e:
        return jsonify({
            "message": "Something went wrong",
            "error": str(e),
            "data": None
        }), 500


@nfts.route('/<nft_id>', methods=['GET'])
@token_required
def get_nft_by_id(nft_id):
    try:
        nft = NFT.get_nft_by_id(nft_id)
        if not nft:
            return jsonify({
                "message": "NFT not found",
                "data": None,
                "error": "Not Found"
            }), 404

        return jsonify({
            "message": "Successfully retrieved NFT",
            "data": nft
        })

    except Exception as e:
        return jsonify({
            "message": "Something went wrong",
            "error": str(e),
            "data": None
        }), 500


@nfts.route('/<nft_id>', methods=['PUT'])
@token_required
def update_nft(nft_id):
    try:
        data = request.json
        updated_nft = NFT.update_nft(nft_id, **data)
        if not updated_nft:
            return jsonify({
                "message": "Failed to update NFT",
                "data": None,
                "error": "Not Modified"
            }), 304

        return jsonify({
            "message": "Successfully updated NFT",
            "data": updated_nft
        }), 200

    except Exception as e:
        return jsonify({
            "message": "Failed to update NFT",
            "error": str(e),
            "data": None
        }), 400


@nfts.route('/<nft_id>', methods=['DELETE'])
@token_required
def delete_nft(nft_id):
    try:
        deleted = NFT.delete_nft(nft_id)
        if not deleted:
            return jsonify({
                "message": "Failed to delete NFT or NFT not found",
                "data": None,
                "error": "Not Found"
            }), 404

        return jsonify({
            "message": "Successfully deleted NFT",
            "data": None
        }), 204

    except Exception as e:
        return jsonify({
            "message": "Failed to delete NFT",
            "error": str(e),
            "data": None
        }), 400
