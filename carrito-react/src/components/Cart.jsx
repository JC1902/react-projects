import { useId } from "react";
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from "./Icons";

export function Cart () {
  const cartCheckboxId = useId()

  return (
    <>
      <label className="cart-button" htmlFor="cart">
        <ClearCartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className="cart">
        <ul>
          <li>
            <img src="" alt='' />
          </li>
        </ul>
      </aside>
    </>
  )
}