const URL_API = `http://localhost:3000`;
const lay_loai = async () => {
    let loai_arr;
    loai_arr = await fetch(URL_API + `/loai`).then(res => res.json()).then(d => d);
    let str = `<li><a href="index.html">Trang chủ</a></li>`;
    loai_arr.forEach(loai => {
        str += `<li><a href="sptrongloai.html?id=${loai.id}"> ${loai.ten_loai} </a></li>`;
    });
    return `<ul>${str}</ul>`;
};
const lay_ten_loai = async (id) => {
    let loai;
    try {
        loai = await fetch(URL_API + `/loai/${id}`).then(res => res.json()).then(d => d);
    }
    catch (err) {
        return `Không có .  (Không có loại ${id})`;
    }
    ;
    return `${loai.ten_loai}`;
};
const code_mot_sp = (sp) => {
    return `
<div class="sp">
    <h3>${sp.ten_sp}</h3>
    <img src="${sp.hinh}">
    <p>Giá gốc: ${Number(sp.gia).toLocaleString("vi")}</p>
    <p>Khuyến mãi: ${Number(sp.gia_km).toLocaleString("vi")}</p>
    <p>Cập nhật: ${new Date(sp.ngay).toLocaleDateString("vi")}</p>  
</div>`;
};
const lay_sp_moi = async (so_sp = 6) => {
    let sp_arr;
    let url = URL_API + `/san_pham?_sort=-ngay&_limit=${so_sp}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    sp_arr.forEach(sp => str += code_mot_sp(sp));
    return str;
};
const lay_sp_hot = async (so_sp = 6) => {
    let sp_arr;
    let url = URL_API + `/san_pham?hot=1&_limit=${so_sp}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    sp_arr.forEach(sp => str += code_mot_sp(sp));
    return str;
};
const lay_sp_trong_loai = async (id) => {
    let sp_arr;
    let url = URL_API + `/san_pham?id_loai=${id}`;
    sp_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    sp_arr.forEach(sp => str += code_mot_sp(sp));
    return str;
};
const code_mot_bv = (bv) => {
    return `
<div class='bv'>
    <h3>${bv.tieu_de}</h3>
    <p>${bv.mo_ta}</p>
</div>
`;
};
const lay_bai_viet_moi = async (so_bv = 6) => {
    let bv_arr;
    let url = URL_API + `/bai_viet?_sort=-ngay&_limit=${so_bv}`;
    bv_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    bv_arr.forEach(bv => str += code_mot_bv(bv));
    return str;
};
const lay_binh_luan = async (so_bl = 6) => {
    let url = URL_API + `/binh_luan?_sort=-ngay&_limit=${so_bl}`;
    let bl_arr;
    bl_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    bl_arr.forEach(bl => str += `<div class="bl">
        <h5>${bl.ho_ten}  
            <span> ${new Date(bl.ngay).toLocaleDateString("vi")} ${new Date(bl.ngay).toLocaleTimeString("vi")} </span>
        </h5>
        <p>${bl.noi_dung}</p>
    </div>`);
    return str;
};
const lay_anh_dep = async (tu_khoa, so_anh) => {
    let url = `https://api.pexels.com/v1/search?query=${tu_khoa}`;
    let apikey = `yp0vLJ0DwNySAk0En4wK6cIO5aQD8RO7UslKuR4gAe19FiAwRNGwwcTp`;
    let data = await fetch(url, { headers: { Authorization: apikey } })
        .then(res => res.json()).then(data => data);
    let hinh_arr = data.photos;
    console.log("hinh_arr= ", hinh_arr);
    let str = ``;
    hinh_arr.forEach(h => {
        let mota = h.alt;
        let tacgia = h.photographer;
        let urlhinh = h.src.medium;
        str += `
            <div class="hinh">
                <img src="${urlhinh}">
                <p>${mota}</p>
                <p>${tacgia}</p>
            </div>
        `;
    });
    return str;
};
export { lay_loai, lay_sp_moi, lay_sp_hot, lay_bai_viet_moi, lay_binh_luan };
export { lay_anh_dep, lay_sp_trong_loai, lay_ten_loai };
