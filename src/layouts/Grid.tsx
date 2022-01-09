import styled, { css } from "styled-components";

interface GRID_PROPS {
  cols?: string | number;
  rows?: string | number;
}
const Grid = styled.section<GRID_PROPS>`
  display: grid;
  grid-gap: 1rem;
  ${(props: GRID_PROPS) => {
    const cols =
      props.cols && `grid-template-columns: repeat(${props.cols}, auto);`;
    const rows =
      props.rows && `grid-template-rows: repeat(${props.cols}, 1fr);`;

    return css`
      ${cols}
      ${rows}
    `;
  }}
`;

export default Grid;
