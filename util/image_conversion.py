import pdf2image
from pdf2image import convert_from_path, convert_from_bytes
from mongo import db

#
# from pdf2image.exceptions import (
#     PDFInfoNotInstalledError,
#     PDFPageCountError,
#     PDFSyntaxError
# )

# images = convert_from_path('/home/belval/example.pdf')
# images = convert_from_bytes(open('/home/belval/example.pdf', 'rb').read())

# import tempfile
#
# with tempfile.TemporaryDirectory() as path:
#     images_from_path = convert_from_path('/home/belval/example.pdf', output_folder=path)
#     # Do something here