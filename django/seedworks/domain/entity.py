from typing import Any


class Entity:
    def _set(self, target: str, value: Any) -> None:
        object.__setattr__(self, target, value)
