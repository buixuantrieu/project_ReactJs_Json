// function HomePage() {
//   const renderTypeList = useMemo(
//     () =>
//       typeList.data.map((item, index) => {
//         return (
//           <S.ProductSnapItem
//             $active={searchParams.typeId === item.id}
//             onClick={() => handleFilter("typeId", item.id)}
//             key={index}
//           >
//             <S.ProductSnapImage
//               $active={searchParams.typeId == item.id}
//               style={{ backgroundImage: `url(/assets/update-image/${item.image})` }}
//             />
//             <S.ProductSnapTypeName>{item.name}</S.ProductSnapTypeName>
//           </S.ProductSnapItem>
//         );
//       }),
//     [typeList.data, search]
//   );

//   return (
//     <S.ProductListWrapper>
//       <S.ProductTitleContainer>
//         <S.ProductTitle>Product Type</S.ProductTitle>
//         <S.ProductDes src="/assets/image/Image-Title-Des.png" />
//       </S.ProductTitleContainer>
//       <S.ProductSnapWrapper>
//         <S.ProductSnapContainer>{renderTypeList}</S.ProductSnapContainer>
//       </S.ProductSnapWrapper>
//     </S.ProductListWrapper>
//   );
// }

function HomePage() {
  return <h1>ok</h1>;
}
export default HomePage;
