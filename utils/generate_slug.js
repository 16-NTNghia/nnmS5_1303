function removeVietnameseTones(str) {
        // str = str.replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a");
        // str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e");
        // str = str.replace(/í|ì|ỉ|ĩ|ị/g, "i");
        // str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o");
        // str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u");
        // str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y");
        // str = str.replace(/đ/g, "d");
        // str = str.replace(/Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ/g, "A");
        // str = str.replace(/É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ/g, "E");
        // str = str.replace(/Í|Ì|Ỉ|Ĩ|Ị/g, "I");
        // str = str.replace(/Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ/g, "O");
        // str = str.replace(/Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g, "U");
        // str = str.replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, "Y");
        // str = str.replace(/Đ/g, "D");
        // return str;
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    }

module.exports = {
    generateSlug: function (name) {
        try {
            name = removeVietnameseTones(name);
            let slug = name.toLowerCase().replace(/ /g, '-');
            return slug;
        } catch (error) {
            throw new Error(error.message)
        }
    },
}