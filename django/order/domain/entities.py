from dataclasses import dataclass
from enum import Enum

from seedworks.domain.entity import Entity


@dataclass(frozen=True)
class Address:
    state: str
    city: str
    zip_code: str
    street: str


class Status(Enum):
    SENT = "SENT"
    PAID = "PAID"
    PENDENT = "PENDENT"


@dataclass(frozen=True)
class Order(Entity):
    status: Status
    customer_id: str
    address: Address

    def change_to_paid(self) -> None:
        self._set("status", Status.PAID)

    def change_to_sent(self) -> None:
        self._set("status", Status.SENT)
